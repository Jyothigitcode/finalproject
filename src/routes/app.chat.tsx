import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Copy, Plus, RefreshCw, Square, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { meetings } from "@/lib/mock-data";
import { answerQuestion } from "@/lib/ai-service";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — MeetMind AI" },
      {
        name: "description",
        content: "Ask questions across every meeting and get cited, instant answers.",
      },
      { property: "og:title", content: "AI Chat — MeetMind AI" },
      { property: "og:description", content: "Chat with your entire meeting history." },
    ],
  }),
  component: ChatPage,
});

type Msg = { id: string; role: "user" | "assistant"; text: string; full?: string; sources?: string[] };

const suggestions = [
  "What did we decide in the Product Development Weekly meeting?",
  "List all open action items and their owners",
  "What are the risks and blockers right now?",
  "Show the Telugu translation summary",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const send = (text: string) => {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);

    const { text: answer, sources } = answerQuestion(text);
    const id = crypto.randomUUID();
    setMessages((m) => [...m, { id, role: "assistant", text: "", full: answer, sources }]);

    let i = 0;
    const tick = setInterval(() => {
      i += 6;
      setMessages((m) =>
        m.map((msg) => (msg.id === id ? { ...msg, text: answer.slice(0, i) } : msg)),
      );
      if (i >= answer.length) {
        clearInterval(tick);
        setStreaming(false);
      }
    }, 16);
  };


  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-4xl flex-col">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pb-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">AI Chat</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Answers grounded in all {meetings.length} of your analyzed meetings.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setMessages([])} className="shrink-0">
          <Plus className="size-4" /> New chat
        </Button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pb-4 pr-1">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid place-items-center gap-4 py-16 text-center"
          >
            <LogoMark className="size-14 rounded-2xl" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Ask anything about your meetings</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Decisions, owners, blockers, sentiment — with citations.
              </p>
            </div>
            <div className="mt-2 grid w-full max-w-xl gap-2 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="surface lift p-3 text-left text-sm text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={m.role === "user" ? "flex justify-end" : "flex gap-3"}
            >
              {m.role === "assistant" && <LogoMark className="size-8 shrink-0 rounded-lg" />}
              <div className={m.role === "user" ? "max-w-[80%]" : "min-w-0 flex-1"}>
                {m.role === "user" ? (
                  <div className="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {m.text}
                  </div>
                ) : (
                  <>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {m.text}
                      {streaming && m.text.length < (m.full?.length ?? 0) && (
                        <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary align-middle" />
                      )}
                    </div>
                    {m.sources && m.text.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {!streaming && m.text.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Copy"
                          onClick={() => {
                            navigator.clipboard.writeText(m.text);
                            toast.success("Copied");
                          }}
                        >
                          <Copy className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" aria-label="Regenerate">
                          <RefreshCw className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" aria-label="Good answer">
                          <ThumbsUp className="size-3.5" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {m.role === "user" && (
                <Avatar className="ml-3 size-8 shrink-0">
                  <AvatarFallback className="bg-muted text-[10px] font-semibold">AM</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="glass sticky bottom-0 rounded-2xl p-2"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask about decisions, owners, risks…"
          className="max-h-40 min-h-[52px] resize-none border-0 bg-transparent pr-12 text-sm shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="text-[11px] text-muted-foreground">
            Enter to send · Shift + Enter for a new line
          </span>
          <Button
            type="submit"
            variant="hero"
            size="icon-sm"
            aria-label="Send message"
            disabled={!input.trim() && !streaming}
          >
            {streaming ? <Square className="size-3.5" /> : <ArrowUp className="size-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

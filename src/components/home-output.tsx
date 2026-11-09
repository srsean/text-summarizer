"use client";

import useHomeStore from "@/stores/home-store";
import { STYLE_THEMES } from "@/utils/style-theme";
import { formatWithCommas } from "@/utils/format-number";
import { Copy, Info, Square, TriangleAlert, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAlert } from "./ui/alert";
import HighlightedText from "./ui/highlighted-text";

interface SoundWarning {
  title: string;
  message: string;
}

const HomeOutput: React.FC = () => {
  const { showAlert } = useAlert();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundWarning, setSoundWarning] = useState<SoundWarning | null>(null);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const speechSessionRef = useRef(0);
  const soundHintShownRef = useRef(false);
  const speechStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const {
    outputWords,
    outputWordsCount,
    outputCharCount,
    outputTone,
    outputStyle,
    outputHighlights,
  } = useHomeStore((state) => state);
  const styleTheme = outputStyle ? STYLE_THEMES[outputStyle] : null;

  useEffect(() => {
    return () => {
      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);
      speechStartTimeoutRef.current = null;
    }

    speechSessionRef.current += 1;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSoundWarning(null);
    setShowSoundHint(false);
  }, [outputWords]);

  useEffect(() => {
    if (!showSoundHint) {
      return;
    }

    const timeout = setTimeout(() => setShowSoundHint(false), 8000);
    return () => clearTimeout(timeout);
  }, [showSoundHint]);

  useEffect(() => {
    if (soundWarning) {
      setShowSoundHint(false);
    }
  }, [soundWarning]);

  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSoundWarning({
        title: "Sound unavailable",
        message: "This browser does not support reading text aloud.",
      });
      return;
    }

    if (isSpeaking) {
      speechSessionRef.current += 1;

      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }

      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (window.speechSynthesis.getVoices().length === 0) {
      setSoundWarning({
        title: "Enable sound permission",
        message:
          "No speech voices were found. In Chrome, open the site controls next to the address bar, set Sound to Allow, or install a system voice, then try again.",
      });
      return;
    }

    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);
      speechStartTimeoutRef.current = null;
    }

    if (!soundHintShownRef.current) {
      soundHintShownRef.current = true;
      setShowSoundHint(true);
    }

    const session = speechSessionRef.current + 1;
    speechSessionRef.current = session;
    window.speechSynthesis.cancel();
    let started = false;
    let startedAt = 0;
    const utterance = new SpeechSynthesisUtterance(outputWords);

    speechStartTimeoutRef.current = setTimeout(() => {
      if (session !== speechSessionRef.current || started) {
        return;
      }

      speechSessionRef.current += 1;
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSoundWarning({
        title: "Enable sound permission",
        message:
          "Speech did not start. In Chrome, open the site controls next to the address bar and set Sound to Allow, then try again.",
      });
      speechStartTimeoutRef.current = null;
    }, 2500);

    utterance.onstart = () => {
      if (session === speechSessionRef.current) {
        started = true;
        startedAt = Date.now();

        if (speechStartTimeoutRef.current) {
          clearTimeout(speechStartTimeoutRef.current);
          speechStartTimeoutRef.current = null;
        }

        setIsSpeaking(true);
        setSoundWarning(null);
      }
    };
    utterance.onend = () => {
      if (session === speechSessionRef.current) {
        if (speechStartTimeoutRef.current) {
          clearTimeout(speechStartTimeoutRef.current);
          speechStartTimeoutRef.current = null;
        }

        setIsSpeaking(false);

        if (
          startedAt > 0 &&
          Date.now() - startedAt < 1000 &&
          outputWordsCount > 10
        ) {
          setSoundWarning({
            title: "Speech stopped unexpectedly",
            message:
              "In Chrome, open the site controls next to the address bar, set Sound to Allow, and check your system volume, then try again.",
          });
        }
      }
    };
    utterance.onerror = (event) => {
      if (session !== speechSessionRef.current) {
        return;
      }

      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }

      setIsSpeaking(false);

      if (event.error === "not-allowed") {
        setSoundWarning({
          title: "Enable sound permission",
          message:
            "Sound is blocked for this site. In Chrome, open the site controls next to the address bar and set Sound to Allow, then try again.",
        });
      } else if (
        event.error === "canceled" ||
        event.error === "interrupted"
      ) {
        setSoundWarning({
          title: "Speech stopped unexpectedly",
          message:
            "The browser interrupted speech. Allow sound for this site and check your system volume, then try again.",
        });
      } else {
        setSoundWarning({
          title: "Could not read summary",
          message: "Check your sound settings and try again.",
        });
      }
    };

    setIsSpeaking(true);

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }

      speechSessionRef.current += 1;
      setIsSpeaking(false);
      setSoundWarning({
        title: "Could not read summary",
        message:
          "Speech could not start. In Chrome, allow sound for this site and check your system volume, then try again.",
      });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputWords);
    showAlert({ messages: [], type: "success", title: "Copied to clipboard" });
  };

  return (
    <section className="flex min-h-[320px] flex-col bg-paper lg:min-h-0">
      <div className="flex min-h-[57px] items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <h2 className="eyebrow">Summary</h2>
        {outputWordsCount > 0 && outputTone && outputStyle ? (
          <div
            title="Tone and style used for this summary"
            className="flex items-center gap-1.5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
              {outputTone}
            </span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                styleTheme ? styleTheme.badgeClass : ""
              }`}
            >
              {outputStyle}
            </span>
          </div>
        ) : null}
      </div>

      {outputWordsCount === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="max-w-[30ch] text-center">
            <p className="font-serif text-[22px] leading-[1.3] text-ink-soft">
              Your summary will appear here.
            </p>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-muted">
              It keeps the key facts and leaves the rest behind.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="fade-in flex-1 overflow-y-auto px-5 py-5 sm:px-6"
          aria-live="polite"
        >
          <div
            role="region"
            aria-label="Generated summary"
            className="whitespace-pre-wrap break-words font-serif text-[17px] leading-[1.75] text-ink"
          >
            {outputStyle ? (
              <HighlightedText
                text={outputWords}
                highlights={outputHighlights}
                style={outputStyle}
              />
            ) : (
              outputWords
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-6">
        {soundWarning ? (
          <div
            role="alert"
            aria-live="assertive"
            className="flex w-full items-start gap-2 rounded-md border border-warn/40 bg-warn-soft p-3 text-left"
          >
            <TriangleAlert
              className="mt-0.5 h-4 w-4 shrink-0 text-warn"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-ink">
                {soundWarning.title}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                {soundWarning.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSoundWarning(null)}
              aria-label="Dismiss sound warning"
              className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-[16px] leading-none text-ink-muted transition-colors hover:bg-white/60 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        ) : showSoundHint ? (
          <div
            role="status"
            className="flex w-full items-start gap-2 rounded-md border border-accent/30 bg-accent-soft p-3 text-left"
          >
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-ink">
                No sound?
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                If you don&apos;t hear the summary, allow sound for this site
                in your browser&apos;s site settings.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSoundHint(false)}
              aria-label="Dismiss sound hint"
              className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-[16px] leading-none text-ink-muted transition-colors hover:bg-white/60 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        ) : null}

        <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">
          {formatWithCommas(outputWordsCount)} words
          <span aria-hidden="true" className="mx-2 text-line-strong">
            /
          </span>
          {formatWithCommas(outputCharCount)} characters
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={handleToggleSpeech}
            disabled={outputWordsCount === 0}
            aria-label={
              isSpeaking ? "Stop reading summary" : "Read summary aloud"
            }
            aria-pressed={isSpeaking}
            title={isSpeaking ? "Stop reading" : "Read aloud"}
            className="btn-secondary h-9 w-9 px-0"
          >
            {isSpeaking ? (
              <Square
                className="h-4 w-4"
                aria-hidden="true"
                fill="currentColor"
              />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={handleCopyToClipboard}
            disabled={outputWordsCount === 0}
            aria-label="Copy summary"
            title="Copy summary"
            className="btn-secondary h-9 w-9 px-0"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeOutput;

import type { ReactNode } from "react";
import { inputClass } from "./field-helpers";

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="w-full my-5 flex flex-col border border-[#e2e8f2] rounded-lg bg-white">
            <div className="border-b border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">{title}</div>
            {children}
        </div>
    );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col w-full">
            <label className="pb-1 text-[11px] font-semibold tracking-wide uppercase text-[#5a6b87]">{label}</label>
            {children}
        </div>
    );
}

type BiFieldProps = {
    label: string;
    en: string;
    zh: string;
    onEn: (value: string) => void;
    onZh: (value: string) => void;
    multiline?: boolean;
    hint?: string;
};

// One field in two languages: English on the left, Chinese on the right.
export function BiField({ label, en, zh, onEn, onZh, multiline, hint }: BiFieldProps) {
    const Input = multiline ? "textarea" : "input";
    return (
        <Field label={label}>
            <div className="flex w-full gap-3">
                <div className="flex w-full flex-col">
                    <span className="pb-1 text-[11px] text-[#94a3b8]">English</span>
                    <Input className={inputClass} value={en} onChange={(e) => onEn(e.target.value)} />
                </div>
                <div className="flex w-full flex-col">
                    <span className="pb-1 text-[11px] text-[#94a3b8]">中文</span>
                    <Input className={inputClass} value={zh} onChange={(e) => onZh(e.target.value)} />
                </div>
            </div>
            {hint && <span className="pt-1 text-[11px] text-[#94a3b8]">{hint}</span>}
        </Field>
    );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            className="h-[28px] w-[28px] shrink-0 cursor-pointer rounded-sm border border-[#e2e8f2] text-[13px] text-[#dc2626]"
            onClick={onClick}
        >
            X
        </button>
    );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <div className="flex flex-col p-5">
            <button
                type="button"
                className="cursor-pointer border border-dashed border-[#e2e8f2] p-2 text-sm text-[#5a6b87]"
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    );
}

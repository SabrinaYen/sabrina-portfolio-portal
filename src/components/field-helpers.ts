// Plain helpers shared by the form components (kept apart from the components).

export const inputClass = "rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]";

// Connects a BiField to an object that stores the Chinese text in `<key>Zh`
// (for example projectName / projectNameZh).
export function biProps<T extends object>(item: T, key: string, change: (changes: Partial<T>) => void) {
    const values = item as unknown as Record<string, string | undefined>;
    return {
        en: values[key] ?? "",
        zh: values[key + "Zh"] ?? "",
        onEn: (value: string) => change({ [key]: value } as Partial<T>),
        onZh: (value: string) => change({ [key + "Zh"]: value } as Partial<T>),
    };
}

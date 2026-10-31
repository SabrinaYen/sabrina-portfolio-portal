import { useState } from "react";

type Item = { id: number; name: string };

type ManageListProps = {
    items: Item[];
    placeholder: string;
    onAdd: (name: string) => Promise<void>;
    onDelete: (item: Item) => Promise<void>;
};

// A small list where you can add a name or remove one (used for companies and purposes).
function ManageList({ items, placeholder, onAdd, onDelete }: ManageListProps) {
    const [name, setName] = useState("");

    const add = async () => {
        if (!name.trim()) return;
        await onAdd(name.trim());
        setName("");
    };

    return (
        <div className="flex flex-col gap-2 p-5">
            {items.length === 0 && <p className="text-[13px] text-[#5a6b87]">Nothing here yet.</p>}
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-[#e2e8f2] px-3 py-2 text-[13px] text-[#1b2b47]">
                    {item.name}
                    <button type="button" className="cursor-pointer text-[#dc2626]" onClick={() => onDelete(item)}>X</button>
                </div>
            ))}
            <div className="flex gap-2">
                <input
                    className="w-full rounded-lg border border-[#e2e8f2] p-2 text-[13px] text-[#1b2b47]"
                    type="text"
                    placeholder={placeholder}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && add()}
                />
                <button type="button" className="cursor-pointer rounded-lg border border-[#e2e8f2] px-4 text-[13px] font-semibold text-[#1b2b47]" onClick={add}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default ManageList;

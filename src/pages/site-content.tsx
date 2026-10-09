function SiteContent() {
    const pageTitle = "Site content";
    return (<>
        <header className="w-full p-3 border-b-1 border-b-[#e2e8f2] flex justify-between items-center sticky top-0 bg-white">
            <label className="text-[#5a6b87] text-[13px] font-semibold">{pageTitle}</label>
            <button className="h-full bg-[#2563eb] text-[13px] px-[16px] py-[9px] rounded-lg text-white">Save changes</button>
        </header>
        <div className="p-[26px] pt-[60px] bg-[#f4f6fb]">
            <h1 className="text-[27px] font-bold">{pageTitle}</h1>
            <h2 className="text-[#5a6b87] text-[13.5px]">Every block below maps to a section of your portfolio page.</h2>
            {/* Hero */}
            <div className=" w-full my-5 flex flex-col border-1 border-[#e2e8f2] rounded-lg bg-white">
                <div className="border-b-1 border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">Hero</div>
                <div className="flex flex-col p-5">
                    <span className="text-[11px] text-[#5a6b87] font-semibold tracking-wide uppercase pb-1">Headline</span>
                    <input type="text" value="" className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" />
                </div>
                <div className="flex flex-col p-5">
                    <label className="text-[11px] text-[#5a6b87] font-semibold tracking-wide uppercase pb-1">Subhead</label>
                    <textarea className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" value="1" />
                </div>
                <div className="flex flex-rows p-5 justify-between w-full gap-3">
                    <div className="flex flex-col w-full">
                        <label className="text-[11px] text-[#5a6b87] tracking-wide pb-1 font-semibold uppercase">Button label</label>
                        <input className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-[11px] text-[#5a6b87] tracking-wide pb-1 font-semibold uppercase">Button link</label>
                        <input className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" />
                    </div>
                </div>

            </div>
            {/* About */}
            <div className=" w-full my-5 flex flex-col border-1 border-[#e2e8f2] rounded-lg bg-white">
                <div className="border-b-1 border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">About</div>
                <div className="flex flex-col p-5">
                    <label className="text-[11px] text-[#5a6b87] font-semibold tracking-wide uppercase pb-1">Bio</label>
                    <textarea className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" value="1" />
                </div>
            </div>
            {/* Project */}
            <div className=" w-full my-5 flex flex-col border-1 border-[#e2e8f2] rounded-lg bg-white">
                <div className="border-b-1 border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">Projects</div>
                <div className="flex flex-rows p-5 justify-between w-full gap-3">
                    <div className="flex flex-col w-full">
                        <label className="text-[11px] text-[#5a6b87] tracking-wide pb-1 font-semibold uppercase">Section Heading</label>
                        <input className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-[11px] text-[#5a6b87] tracking-wide pb-1 font-semibold uppercase">Projects Shown</label>
                        <input className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" />
                    </div>
                </div>
                <div className="flex flex-col p-5">
                    <span className="text-[11px] text-[#5a6b87] font-semibold tracking-wide uppercase pb-1">Intro</span>
                    <textarea value="" className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" />
                </div>
                <div className="flex flex-col p-5">
                    <button className="border-1 border-dashed border-[#e2e8f2] text-[#5a6b87] p-2 text-sm cursor-pointer">+ Add Project</button>
                </div>
            </div>
            {/* Experience */}
            <div className=" w-full my-5 flex flex-col border-1 border-[#e2e8f2] rounded-lg bg-white">
                <div className="border-b-1 border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">Experience</div>
                <div className="flex flex-col p-5 w-full gap-3">
                    <div className="flex flex-row w-full gap-3">
                        <input className="min-w-[300px] border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" placeholder="Role" />
                        <input className="min-w-[300px] border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" placeholder="Company" />
                        <input className="min-w-[300px] border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" placeholder="2022 - now" />
                    </div>
                    <div className="flex flex-rows items-start gap-2">
                        <textarea value="" className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg w-full" />
                        <button className="border-1 rounded-sm w-[28px] h-[28px] text-[#dc2626] border-[#e2e8f2] text-[13px] cursor-pointer">X</button>
                    </div>
                </div>
                <div className="flex flex-col p-5">
                    <button className="border-1 border-dashed border-[#e2e8f2] text-[#5a6b87] p-2 text-sm cursor-pointer">+ Add Role</button>
                </div>
            </div>
            {/* Skills */}
            <div className=" w-full my-5 flex flex-col border-1 border-[#e2e8f2] rounded-lg bg-white">
                <div className="border-b-1 border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">Experience</div>
                <div className="flex flex-col p-5 w-full gap-3">
                    <div className="flex flex-row w-full gap-3">
                        <input className="min-w-[300px] border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg text-[13px]" type="text" value="" placeholder="Group" />
                    </div>
                    <div className="flex flex-rows items-start gap-2">
                        <input className="w-full border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg text-[13px]" type="text" value="" placeholder="Comma seperated (eg:HTML,CSS,Figma)" />
                    </div>
                    <button className="border-1 rounded-sm w-[28px] h-[28px] text-[#dc2626] border-[#e2e8f2] text-[13px] cursor-pointer">X</button>

                </div>
                <div className="flex flex-col p-5">
                    <button className="border-1 border-dashed border-[#e2e8f2] text-[#5a6b87] p-2 text-sm cursor-pointer">+ Add Role</button>
                </div>
            </div>
            {/* Résumé & contact */}
            <div className=" w-full my-5 flex flex-col border-1 border-[#e2e8f2] rounded-lg bg-white">
                <div className="border-b-1 border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">Résumé & contact</div>
                <div className="border-1 border-[#e2e8f2] items-center rounded-lg px-[12px] py-[14px] flex justify-between m-5">
                    <div className="flex flex-row gap-3 mx-5">
                        <div className="p-2 w-[38px] bg-[#eaf1fe] rounded-sm text-[#2563eb] text-[11px] text-center font-bold">PDF</div>
                        <div className="leading-tight">
                            <div className="text-[13px]">filename</div>
                            <div className="text-[13px] text-[#5a6b87]">date</div>
                        </div>
                    </div>
                    <button className="border-1 border-[#e2e8f2] text-[#1b2b47] rounded-lg cursor-pointer font-semibold text-[13px] px-[14px] py-[8px]">Replace</button>
                </div>
                <div className="flex flex-rows py-5 justify-between w-full gap-3 px-5">
                    <div className="flex flex-col w-full">
                        <label className="text-[11px] text-[#5a6b87] tracking-wide pb-1 font-semibold uppercase">Email</label>
                        <input className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-[11px] text-[#5a6b87] tracking-wide pb-1 font-semibold uppercase">Location</label>
                        <input className="border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg" type="text" value="" />
                    </div>
                </div>
                <div className="flex flex-col py-5 w-full gap-3 px-5">
                    <div className="flex flex-row w-full gap-3">
                        <input className="min-w-[300px] border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg text-[13px]" type="text" value="" placeholder="Group" />
                    </div>
                    <div className="flex flex-rows items-start gap-2">
                        <input className="w-full border-1 border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg text-[13px]" type="text" value="" placeholder="Comma seperated (eg:HTML,CSS,Figma)" />
                    </div>
                    <button className="border-1 rounded-sm w-[28px] h-[28px] text-[#dc2626] border-[#e2e8f2] text-[13px] cursor-pointer">X</button>
                </div>
                <div className="flex flex-col p-5">
                    <button className="border-1 border-dashed border-[#e2e8f2] text-[#5a6b87] p-2 text-sm cursor-pointer">+ Add Link</button>
                </div>
            </div>


        </div>
    </>)
}
export default SiteContent;
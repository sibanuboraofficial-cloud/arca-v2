"use client";

export default function CropMarks() {
  const markStyle =
    "absolute w-6 h-6 pointer-events-none opacity-20";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] p-6">
      {/* Top-left */}
      <div className={`${markStyle} top-6 left-6`}>
        <div className="absolute top-0 left-0 h-full w-px bg-foreground" />
        <div className="absolute top-0 left-0 h-px w-full bg-foreground" />
      </div>
      {/* Top-right */}
      <div className={`${markStyle} top-6 right-6`}>
        <div className="absolute top-0 right-0 h-full w-px bg-foreground" />
        <div className="absolute top-0 right-0 h-px w-full bg-foreground" />
      </div>
      {/* Bottom-left */}
      <div className={`${markStyle} bottom-6 left-6`}>
        <div className="absolute bottom-0 left-0 h-full w-px bg-foreground" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-foreground" />
      </div>
      {/* Bottom-right */}
      <div className={`${markStyle} bottom-6 right-6`}>
        <div className="absolute bottom-0 right-0 h-full w-px bg-foreground" />
        <div className="absolute bottom-0 right-0 h-px w-full bg-foreground" />
      </div>
    </div>
  );
}

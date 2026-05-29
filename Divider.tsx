export default function Divider() {
  return (
    <section className="bg-white h-[200px] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            #8B5CF6 10px,
            #8B5CF6 11px
          )`,
        }}
        aria-hidden="true"
      />
    </section>
  );
}

export default function BlueprintCorners() {
  const corner = "absolute h-5 w-5 border-white/35 sm:h-6 sm:w-6";
  return (
    <>
      <span className={`${corner} top-0 left-0 border-t border-l`} aria-hidden />
      <span className={`${corner} top-0 right-0 border-t border-r`} aria-hidden />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} aria-hidden />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} aria-hidden />
    </>
  );
}

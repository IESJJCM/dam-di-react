/**
 * Placeholder shown while a page loads its data.
 *
 * `role="status"` makes screen readers announce the text when it appears,
 * so they know the page is working and not stuck.
 */
export const Loading = () => {
  return (
    <p role="status" className="py-10 text-center text-xl text-gray-600">
      Cargando…
    </p>
  );
};

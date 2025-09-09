export function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border shadow-sm ${className}`}>{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="px-4 pt-4">{children}</div>;
}
export function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}
export function CardContent({ children }) {
  return <div className="p-4 pt-2">{children}</div>;
}
export function Button({ children, variant="default", className="", ...props }) {
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm";
  const styles = variant === "outline" ? "border bg-white hover:bg-gray-50" : "bg-gray-900 text-white hover:opacity-90";
  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>;
}

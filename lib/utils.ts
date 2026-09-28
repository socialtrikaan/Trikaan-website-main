/** Join truthy class names. ponytail: tiny cn, no clsx dep needed. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

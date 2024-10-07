import { object, string, array, optional, boolean, Infer } from "superstruct";

const Browser = object({
  path: string(),
  icon: string(),
  home: string(),
  name: optional(string()),
  default: optional(boolean()),
  matches: optional(array(string())),
});

type Browser = Infer<typeof Browser>;

export { Browser }

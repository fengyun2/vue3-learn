import type { InjectionKey, Ref } from "vue";

export const ProvideKey = Symbol() as InjectionKey<Ref<string>>;

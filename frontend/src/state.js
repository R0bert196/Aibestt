import { atomWithStorage } from "jotai/utils";

const token = atomWithStorage("token", "");
const companyNameSearched = atomWithStorage("", "");

const state = { token, companyNameSearched };

export default state;

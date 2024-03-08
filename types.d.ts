
declare interface Msg {
  type: "save"|"ctx";
  save?: Fill[];
}

declare interface Fill {
  id: string;
  origin: string;
  value: string;
}
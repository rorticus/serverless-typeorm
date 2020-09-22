import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Document {
  @PrimaryColumn({ type: "uuid" })
  id: string = "";

  @Column()
  name: string = "";
}

export default Document;

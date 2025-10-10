import { LinkCard } from "@/blocks";
import { links } from "@/blocks/info";

export default function Page() {
  return (
    <div className="f-rw w-100 gap-32 j-center">
      {links.map((i) => {
        return (
          <LinkCard key={i.name} href={i.href} tooltip={i.tooltip}>
            {i.icon}{i.name}
          </LinkCard>
        )
      })}
    </div>
  );
}
import {
  SidebarGroupLabel,
  SidebarGroup,
  SidebarMenu,
} from "@/common/components/atoms/ui/sidebar";

import SidebarItem from "../sidebar-items";
import { SidebarConfig } from "../../types";
import { memo } from "react";

export interface SidebarBuilderProps {
  config: SidebarConfig;
}

const SidebarSection = memo(
  ({ section }: { section: SidebarConfig["sections"][0] }) => (
    <SidebarGroup key={section.id}>
      <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
      <SidebarMenu>
        {section.items.map((item, index) => (
          <SidebarItem
            key={`${item.accessorKey || item.title}-${index}`}
            {...item}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
);

SidebarSection.displayName = "SidebarSection";

export const SidebarBuilder = memo(({ config }: SidebarBuilderProps) => {
  if (!config?.sections?.length) return null;

  return (
    <>
      {config.sections.map((section) => (
        <SidebarSection key={section.id} section={section} />
      ))}
    </>
  );
});

SidebarBuilder.displayName = "SidebarBuilder";

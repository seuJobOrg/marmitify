import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from "@/components/ui/breadcrumb"



export function BreadcrumbComponent({ items }: { items: { to: string; label: string }[] }) {
  return (
    <Breadcrumb className="mb-4">
        <BreadcrumbList>
            {items.map((item, index) => (
                    <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={`/${item.to}`}>
                        {item.label}
                    </BreadcrumbLink>
                    {index < items.length - 1 && (
                        <span className="mx-2">/</span>
                    )}
                    </BreadcrumbItem>
            ))}
        </BreadcrumbList>
    </Breadcrumb>
  );
}
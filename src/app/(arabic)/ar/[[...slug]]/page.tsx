import { SitePage } from "@/components/pages";
import { metadataFor, staticParams } from "@/lib/routes";
export const dynamicParams = false;
export const generateStaticParams = staticParams;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  return metadataFor("ar", (await params).slug?.join("/") || "");
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  return <SitePage locale="ar" path={(await params).slug?.join("/") || ""} />;
}

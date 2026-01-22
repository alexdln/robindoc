import { Page, getMetadata, getStaticParams } from "../robindoc";

export default async function Docs({ params }: { params: Promise<{ segments?: string[] }> }) {
    const { segments } = await params;
    const pathname = "/docs/" + (segments?.join("/") || "");

    return (
        <Page
            pathname={pathname}
            config={{
                publicDirs: ["public"],
            }}
        />
    );
}

export const generateMetadata = async ({ params }: { params: Promise<{ segments?: string[] }> }) => {
    const { segments } = await params;
    const pathname = "/docs/" + (segments?.join("/") || "");
    const metadata = await getMetadata(pathname);

    return metadata;
};

export const generateStaticParams = async () => {
    const staticParams = await getStaticParams("/docs");

    return staticParams;
};

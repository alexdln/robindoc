import Link from "next/link";

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome</h1>
            <h2>Get started with your documentation</h2>

            <div className="home-cards">
                <Link href="/docs" className="home-card">
                    <h3>Template Documentation</h3>
                    <p>Learn how this starter app works and customize it to your needs</p>
                </Link>

                <a href="https://robindoc.com/docs" target="_blank" rel="noopener noreferrer" className="home-card">
                    <h3>RobinDoc Documentation</h3>
                    <p>Explore advanced features, configuration options, and customization guides</p>
                </a>
            </div>
        </div>
    );
}

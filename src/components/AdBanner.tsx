import styles from "./AdBanner.module.css";

interface AdBannerProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle";
    className?: string;
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
    return (
        <div className={`${styles.adContainer} ${className}`} aria-label="Advertisement">
            <div className={styles.placeholderText}>
                <span>Ad Space</span>
                <small>Google AdSense Preview</small>
                {/* In production, the script would inject the ad here */}
            </div>
        </div>
    );
}

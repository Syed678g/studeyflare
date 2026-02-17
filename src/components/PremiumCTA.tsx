import { Crown, Check } from "lucide-react";
import Button from "./Button";
import styles from "./PremiumCTA.module.css";
import Link from "next/link";

export default function PremiumCTA() {
    return (
        <div className={styles.ctaCard}>
            <div className={styles.iconWrapper}>
                <Crown size={32} />
            </div>
            <div className={styles.content}>
                <h3>Unlock Unlimited Access</h3>
                <p>Get unlimited PDF downloads, ad-free experience, and exclusive exam cheat sheets.</p>
                <ul className={styles.benefits}>
                    <li><Check size={16} /> Unlimited PDF Downloads</li>
                    <li><Check size={16} /> No Ads</li>
                    <li><Check size={16} /> Priority AI Support</li>
                </ul>
            </div>
            <div className={styles.action}>
                <Link href="/pricing">
                    <Button variant="primary" fullWidth className={styles.upgradeBtn}>Go Premium</Button>
                </Link>
            </div>
        </div>
    );
}

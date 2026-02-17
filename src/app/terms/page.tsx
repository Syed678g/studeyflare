import styles from "../legal.module.css";

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.lastUpdated}>Last Updated: October 25, 2023</p>

            <div className={styles.content}>
                <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Studyflare website (the "Service") operated by Studyflare ("us", "we", or "our").</p>

                <h2>Conditions of Use</h2>
                <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
                <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

                <h2>Content</h2>
                <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>

                <h2>Links To Other Web Sites</h2>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Studyflare. Studyflare has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p>
            </div>
        </div>
    );
}

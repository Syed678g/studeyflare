import Button from "@/components/Button";
import styles from "./page.module.css";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.subtitle}>Have questions or feedback? We'd love to hear from you.</p>
            </header>

            <div className={styles.grid}>
                <div className={styles.infoCol}>
                    <div className={styles.infoCard}>
                        <h3>Get in Touch</h3>
                        <div className={styles.infoItem}>
                            <Mail className={styles.icon} size={20} />
                            <span>support@studyflare.com</span>
                        </div>
                        <div className={styles.infoItem}>
                            <Phone className={styles.icon} size={20} />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className={styles.infoItem}>
                            <MapPin className={styles.icon} size={20} />
                            <span>123 Education Lane, Tech City, CA 94043</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formCol}>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Name</label>
                            <input type="text" placeholder="Your name" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input type="email" placeholder="Your email" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Message</label>
                            <textarea placeholder="How can we help?" rows={5} className={styles.textarea}></textarea>
                        </div>
                        <Button variant="primary" fullWidth>Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { Upload, FileText, BarChart2, Users, DollarSign, Plus, Edit, Trash } from "lucide-react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Admin Panel</h2>
                </div>
                <nav className={styles.nav}>
                    <button
                        className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""}`}
                        onClick={() => setActiveTab("overview")}
                    >
                        <BarChart2 size={20} /> Overview
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === "notes" ? styles.active : ""}`}
                        onClick={() => setActiveTab("notes")}
                    >
                        <FileText size={20} /> Manage Notes
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === "blogs" ? styles.active : ""}`}
                        onClick={() => setActiveTab("blogs")}
                    >
                        <Edit size={20} /> Manage Blog
                    </button>
                </nav>
            </aside>

            <main className={styles.content}>
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "notes" && <NotesManager />}
                {activeTab === "blogs" && <BlogManager />}
            </main>
        </div>
    );
}

function OverviewTab() {
    return (
        <div className={styles.tabContent}>
            <h1>Dashboard Overview</h1>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><Users size={24} /></div>
                    <div className={styles.statInfo}>
                        <h3>Total Users</h3>
                        <p>12,345</p>
                        <span className={styles.growth}>+12% this week</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><FileText size={24} /></div>
                    <div className={styles.statInfo}>
                        <h3>Total Notes</h3>
                        <p>845</p>
                        <span className={styles.growth}>+5 new today</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><DollarSign size={24} /></div>
                    <div className={styles.statInfo}>
                        <h3>Revenue</h3>
                        <p>$1,240</p>
                        <span className={styles.growth}>+8% this month</span>
                    </div>
                </div>
            </div>

            <div className={styles.chartSection}>
                <h2>Traffic Analytics</h2>
                <div className={styles.mockChart}>
                    <div className={styles.chartBar} style={{ height: '40%' }}></div>
                    <div className={styles.chartBar} style={{ height: '60%' }}></div>
                    <div className={styles.chartBar} style={{ height: '35%' }}></div>
                    <div className={styles.chartBar} style={{ height: '80%' }}></div>
                    <div className={styles.chartBar} style={{ height: '55%' }}></div>
                    <div className={styles.chartBar} style={{ height: '90%' }}></div>
                    <div className={styles.chartBar} style={{ height: '70%' }}></div>
                </div>
                <div className={styles.chartLabels}>
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>
        </div>
    );
}

function NotesManager() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.headerAction}>
                <h1>Manage Notes</h1>
                <Button variant="primary">Add New Note <Plus size={18} style={{ marginLeft: 6 }} /></Button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Downloads</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Organic Chemistry Basics</td>
                        <td>Chemistry</td>
                        <td>Grade 11</td>
                        <td>340</td>
                        <td>
                            <button className={styles.actionBtn}><Edit size={16} /></button>
                            <button className={styles.actionBtn}><Trash size={16} /></button>
                        </td>
                    </tr>
                    <tr>
                        <td>Newton's Laws</td>
                        <td>Physics</td>
                        <td>Grade 11</td>
                        <td>670</td>
                        <td>
                            <button className={styles.actionBtn}><Edit size={16} /></button>
                            <button className={styles.actionBtn}><Trash size={16} /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function BlogManager() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.headerAction}>
                <h1>Manage Blog Posts</h1>
                <Button variant="primary">Write New Post <Plus size={18} style={{ marginLeft: 6 }} /></Button>
            </div>

            <div className={styles.blogList}>
                <div className={styles.blogItem}>
                    <div className={styles.blogInfo}>
                        <h4>How to Study Physics Fast</h4>
                        <span>Published: Nov 10, 2023</span>
                    </div>
                    <div className={styles.blogActions}>
                        <Button variant="outline" size="sm">Edit</Button>
                    </div>
                </div>
                <div className={styles.blogItem}>
                    <div className={styles.blogInfo}>
                        <h4>Class 10 Math Notes Guide</h4>
                        <span>Published: Nov 12, 2023</span>
                    </div>
                    <div className={styles.blogActions}>
                        <Button variant="outline" size="sm">Edit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

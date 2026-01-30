const mysql = require('mysql2/promise')

const kapcsolat = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "link_shortener"
})

module.exports = {
    getAllLinks: async () => {
        const [rows] = await kapcsolat.query("SELECT * FROM short_links");
        return rows;
    },
    addLink: async (site_name, original_url, alias, expires_at) => {

        const [rows] = await kapcsolat.query(`INSERT INTO short_links (site_name, original_url, alias, expires_at) VALUES (?, ?, ?, ${expires_at.length == 0 ? "NULL" : '?'})`, [site_name, original_url, alias, expires_at]);
        return {rows};
    },
    getLinkByAlias: async (alias) => {
        const [rows] = await kapcsolat.query("SELECT * FROM short_links WHERE alias = ?", [alias]);
        return rows[0];
    },
    deleteLinkByAlias: async (alias) => {
        const [rows] = await kapcsolat.query("DELETE FROM short_links WHERE alias = ?", [alias]);
        return {rows};
    }
};
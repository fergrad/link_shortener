const LinkModel = require('../models/LinkModel');

exports.getAllLinks = async (req, res) => {
    try {
        const links = await LinkModel.getAllLinks();
        res.json(links);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addURL = async (req, res) => {
    const {site_name, original_url, alias, expires_at} = req.body
    try {
        const response = await LinkModel.addLink(site_name, original_url, alias, expires_at)
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });   
    }

}

exports.redirectToOrigin = async (req, res) => {
    const alias = req.params.alias;
    try {
        const link = await LinkModel.getLinkByAlias(alias);
        if (link) {
            if (link.expires_at != null && new Date(link.expires_at) < new Date()) {
                return res.status(410).send('This link has expired');
            }
            else{
                res.redirect(link.original_url);
            }
        } else {
            res.status(404).send('Link not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteURL = async (req, res) => {
    const alias = req.params.id;
    try {
        const response = await LinkModel.deleteLinkByAlias(alias);
        res.status(200).json({ message: 'Link deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}
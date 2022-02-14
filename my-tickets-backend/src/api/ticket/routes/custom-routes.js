"use-strict";

module.exports = {
    routes: [
        {
            method: 'POST',
            path: "/tickets/:id/comment",
            handler: "ticket.comment",
            config: {
                "policies": []
            }
        }
    ]
}
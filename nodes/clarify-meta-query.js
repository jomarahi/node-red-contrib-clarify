module.exports = function (RED) {
    function ClarifyMetaQueryNode(config) {
        RED.nodes.createNode(this, config);
        this.api = RED.nodes.getNode(config.apiRef);
        var node = this;
        if (this.api) {
            // if (!this.api.apiUrl) {
            //     this.status({ fill: "red", shape: "ring", text: "missing parameters" });
            //     node.error('Missing mandatory parameters. Execution will halt. Please reconfigure and publish again');
            //     return;
            // }
            // this.status({});
            this.on('input',async function (msg, send, done) {
                try {
                    const res = await node.api.metaQuery(
                        msg.query,
                        msg.method || 'GET',
                        msg.params || '',
                        msg.data || ''
                    )
                    msg.payload = res.data
                    send(msg)
                    done()
                } catch (error) {
                    done({error})
                }
                
                // if (!dataType) {
                //     node.status({ fill: "red", shape: "ring", text: 'Missing data type' });
                //     done({ "error:": 'Missing data type' });
                //     
                // }

                // if (!signalID || !signalIDpattern.test(signalID)) {
                //     node.status({ fill: "red", shape: "ring", text: 'Missing or incorrect signal ID' });
                //     done({ "error:": 'Missing or incorrect signal ID' });
                //     return
                // }
                // if (inputDataCheck(data)) {
                //     node.api.addData(dataType, signalID, data).then(response => {
                //         msg.payload = response
                //         send(msg);
                //         done();
                //     }).catch(error => {
                //         node.status({ fill: "red", shape: "ring", text: error.message });
                //         done({ "error:": error });
                //     });
                // } else {
                //     node.status({ fill: "red", shape: "ring", text: 'Missing or wrong data format' });
                //     done({ "error:": 'Missing or wrong data format' });
                // }
            });

        } else {
            this.error("Missing config");
        }
    }


    RED.nodes.registerType("meta-query", ClarifyMetaQueryNode);
};
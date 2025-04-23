const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const db = require("../db");

router.get("/groups", (req, res) => {
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/groups-preview.sql"))
    .toString();

  db(sql)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.get("/groups/:groupId", (req, res) => {
  const groupId = req.params.groupId;

  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/groupById.sql"))
    .toString()
    .replace(':groupId', groupId);

  db(sql)
    .then(data => {
      const responseData = {
        groupId,
        groupCaption: data["group_caption"],
        nodes: []
      };

      data.forEach(element => {
        responseData.nodes.push({
          id: element["node_id"],
          caption: element["node_caption"],
          statusCode: element["node_status_code"],
          statusColor: element["node_status_color"],
          statusDescription: element["node_status_description"],
          cpuUtilization: element["cpu_utilization"],
          memoryUtilization: element["memory_utilization"],
          diskUtilization: element["disk_utilization"]
        })
      });

      return res.json(responseData);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
})

router.get("/metrics/:nodeId", (req, res) => {
  const nodeId = req.params.nodeId;
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/metrics.sql"))
    .toString()
    .replace(':nodeId', nodeId);
  db(sql)
    .then(data => {
      let responseData = {
        nodeId: nodeId,
        metrics: [],
      };

      data.forEach((item) => {
        responseData.metrics.push({
          id: item["metrics_id"],
          datetime: item["datetime"],
          cpuUtilization: item["cpu_utilization"],
          memoryUtilization: item["memory_utilization"],
          diskUtilization: item["disk_utilization"],
        });
      })

      return res.json(responseData);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.get("/nodes/:nodeId", (req, res) => {
  const nodeId = req.params.nodeId;
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/nodeById.sql"))
    .toString()
    .replace(':nodeId', nodeId);

  db(sql)
    .then(data => {
      const firstRow = data[0];
      const responseData = {
        id: nodeId,
        caption: firstRow["node_caption"],
        statusCode: firstRow["node_status_code"],
        statusColor: firstRow["node_status_color"],
        statusDescription: firstRow["node_status_description"],
        interfaceId: firstRow["interface_id"],
        interfaceCaption: firstRow["interface_caption"],
        interfaceCode: firstRow["node_status_code"],
        interfaceColor: firstRow["node_status_color"],
        interfaceDescription: firstRow["node_status_description"],
        applicationId: firstRow["application_id"],
        applicationCaption: firstRow["application_caption"],
        adminId: firstRow["admin_id"],
        adminFirstname: firstRow["admin_firstname"],
        adminLastname: firstRow["admin_lastname"],
        adminEmail: firstRow["admin_email"]
      }
      return res.json(responseData);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = router;

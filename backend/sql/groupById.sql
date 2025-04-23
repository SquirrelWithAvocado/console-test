SELECT 
  g.id as group_id,
  g.caption as group_caption,
  n.id as node_id,
  n.caption as node_caption,
  n.status as node_status_code,
  ns.color as node_status_color,
  ns.description as node_status_description,
  m.cpu_utilization as cpu_utilization,
  m.memory_utilization as memory_utilization,
  m.disk_utilization as disk_utilization,
  m.datetime as metric_datetime
FROM groups as g
  LEFT JOIN groups_nodes as gn ON g.id = gn.group_id
  LEFT JOIN nodes as n ON gn.node_id = n.id
  LEFT JOIN statuses as ns ON n.status = ns.id
  LEFT JOIN (
    SELECT m1.*
    FROM metrics m1
    JOIN (
      SELECT node_id, MAX(datetime) as max_datetime
      FROM metrics
      GROUP BY node_id
    ) m2 ON m1.node_id = m2.node_id AND m1.datetime = m2.max_datetime
  ) as m ON m.node_id = n.id
WHERE g.id = :groupId;
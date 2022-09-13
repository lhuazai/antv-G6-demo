const GI_SCHEMA_DATA = {
  "nodes": [{
    "nodeType": "僵尸网络家族",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "string",
      "dataType": "string",
      "legendType": "string",
      "first_seen": "string",
      "last_seen": "string"
    }
  }, {
    "nodeType": "漏洞事件",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "string",
      "dataType": "string",
      "legendType": "string"
    }
  }, {
    "nodeType": "单文件",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "string",
      "name": "string",
      "dataType": "string",
      "legendType": "string",
      "md5": "string"
    }
  }, {
    "nodeType": "固件",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "number",
      "dataType": "string",
      "legendType": "string",
      "md5": "string",
      "manu": "string",
      "device_type": "string",
      "name": "string",
      "os": "string"
    }
  }, {
    "nodeType": "设备制造商",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "string",
      "dataType": "string",
      "legendType": "string",
      "country": "string"
    }
  }, {
    "nodeType": "国家",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "string",
      "dataType": "string",
      "legendType": "string"
    }
  }, {
    "nodeType": "在线设备资产",
    "nodeTypeKeyFromProperties": "legendType",
    "properties": {
      "id": "string",
      "dataType": "string",
      "legendType": "string",
      "company": "string",
      "type": "string",
      "latitude": "string",
      "longitude": "string",
      "country": "string",
      "province": "string",
      "city": "string",
      "device_type": "string",
      "port": "number"
    }
  }],
  "edges": [{
    "edgeType": "botnet_to_cve",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "僵尸网络家族",
    "targetNodeType": "漏洞事件",
    "properties": {
      "source": "string",
      "target": "string",
      "edgeType": "string"
    }
  }, {
    "edgeType": "cve_to_file",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "漏洞事件",
    "targetNodeType": "单文件",
    "properties": {
      "source": "string",
      "target": "string",
      "edgeType": "string"
    }
  }, {
    "edgeType": "file_to_firmware",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "单文件",
    "targetNodeType": "固件",
    "properties": {
      "source": "string",
      "target": "number",
      "edgeType": "string"
    }
  }, {
    "edgeType": "firmware_to_manu",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "固件",
    "targetNodeType": "设备制造商",
    "properties": {
      "source": "number",
      "target": "string",
      "edgeType": "string"
    }
  }, {
    "edgeType": "manu_to_country",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "设备制造商",
    "targetNodeType": "国家",
    "properties": {
      "source": "string",
      "target": "string",
      "edgeType": "string"
    }
  }, {
    "edgeType": "firmware_to_assets",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "固件",
    "targetNodeType": "在线设备资产",
    "properties": {
      "source": "number",
      "target": "string",
      "edgeType": "string"
    }
  }, {
    "edgeType": "assets_to_country",
    "edgeTypeKeyFromProperties": "edgeType",
    "sourceNodeType": "在线设备资产",
    "targetNodeType": "国家",
    "properties": {
      "source": "string",
      "target": "string",
      "edgeType": "string"
    }
  }]
};

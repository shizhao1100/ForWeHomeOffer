# ForWeHomeOffer

## 功能
----------------
+ 一个可缩放的地图
+ 点击地图上某一位置时，在适当的地方显示该位置当前的空气污染指数
+ 刷选要一个区域显示该区域的空气污染指数
+ 擦除一个区域的数据
+ 颜色区分空气指数梯度
## 技术
----------------
+ OpenStreetMap MapBox灰色系底图
+ leaflet.js
+ aqicnAPI

## 为什么选择它？
----------------

+ OpenStreetMap MapBox灰色系底图
    1.  全球化视野
    2.  较 http://www.google.cn/maps 更为稳定
    3.  灰色系凸显数据浮层
    4.  基于wgs84编码
+ leaflet.js
    1.  较高德地图API、百度地图API性能更为优越
    2.  更为美观
+ aqicnAPI
    1. 全球化数据
    2. 免费
    3. 较pm25.inAPI调用次数更多
## 是否选择前端框架？
-------------------
+ JQuery


## 为什么？
-------------------
1. 基于地图的Dom控制已由leafle控制
2. 基于ControlBox的交互控制由Jq或原生API提供
3. 暂无数据双向数据绑定需求无需Angular.js
4. 其余框架不熟

## 代码架构
-------------------
1. map.js  提供地图交互功能
2. variable.js 保存数据对象
3. controlbox.js 控制器代码
4. connector.js 接口代码
## 遇到的问题
-------------------
+ aqicn token注册困难
    + 该网站注册token界面与6月1日较长时间段无法获取验证码
+ aqicnAPI bug？
    + 根据区域获取空气质量接口存在问题
        + GPS顺序必须做限制 第一个参数的经纬度必须小于第二个参数
        + 返回数据混乱 较大一部分数据不在请求区域内
## 演示地址
-------------------
+ [sz-p.cn/ForWeHomeOffer](http://sz-p.cn/ForWeHomeOffer "一兆的小水管 请善待它")
## 截屏
-------------------
![image](https://raw.githubusercontent.com/shizhao1100/ForWeHomeOffer/master/readmeIMG/img.png)
## Marker颜色说明
![image](https://raw.githubusercontent.com/shizhao1100/ForWeHomeOffer/master/readmeIMG/color.png)

## BUG?
   时间紧迫可能存在
   

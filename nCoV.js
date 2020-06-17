// #endregion
const nCoVdata = encodeURI("https://lab.isaaclin.cn/nCoV/api/overall?latest=1")
const newData = encodeURI("https://lab.isaaclin.cn/nCoV/api/news?page=1&num=1")
$httpClient.get(newData, function (error, response, data) {
    if (error) {
        console.log(error);
    } else {
        console.log(data); 
        var obj1 = JSON.parse(data);
        let newObj = obj1.results[0];
        $httpClient.get(nCoVdata, function (error, response, data) {
            if (error) {
                console.log(error);
            } else {
                console.log(data); 
                var obj = JSON.parse(data);
                var tit = "【全国疫情信息概览】"
                var subTit = "\n"
                var details = "「数据统计」" + "\n\n    -新增确诊: "+ obj.results[0].currentConfirmedIncr + "\n    -现有确诊: " + obj.results[0].currentConfirmedCount + "\n    -累计确诊: " + obj.results[0].confirmedCount + "\n    -治愈: " + obj.results[0].curedCount + "\n    -死亡: " + obj.results[0].deadCount + "\n\n「疫情动态」\n\n     " + newObj.title +"\n\n「动态详情」\n\n     "+ newObj.summary;
                let nCoV = [tit, subTit, details];
                $notification.post(nCoV[0], nCoV[1], nCoV[2]);
                $done();
            }
        }
        );
        $done();
    }
}
);

/*****************************************************************
# 全国疫情速看 (By Mazetsz)0
[Task]
# 在每天 9:00 报告新冠肺炎疫情
0 9 * * * nCoV.js
*****************************************************************/

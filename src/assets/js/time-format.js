export default function(t){
    let oldTime = new Date(t);
    let nowTime = new Date();

    let h = oldTime.getHours();
    let m = oldTime.getMinutes();
    let Y = oldTime.getFullYear();
    let M = oldTime.getMonth();
    let D = oldTime.getDate()-2 ;


  
    let nY = nowTime.getFullYear();
    let nM = nowTime.getMonth();
    let nD = nowTime.getDate();

    // 当天消息时间
    if(D === nD && M === nM && Y === nY){
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;

        return h + ':' + m;
    }else if(D+1 === nD && M === nM && Y === nY){
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
        
            return '昨天' + h + ':' + m;
    }else{
    //大于两天的时间
        return Y + '/' + (M + 1) + '/' + D;
    }

}
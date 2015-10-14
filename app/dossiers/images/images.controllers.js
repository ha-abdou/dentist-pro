angular.module('dentist.images')
    .controller('imgListCtrl', _ListImages);

function _ListImages($stateParams , $scope){
    /**
     * @return {string}
     */
    function ConvertNumber(number, format){
        var n = number;
        var tail=format.lastIndexOf('.');number=number.toString();
        tail=tail>-1?format.substr(tail):'';
        if(tail.length>0){if(tail.charAt(1)=='#'){
            tail=number.substr(number.lastIndexOf('.'),tail.length);
        }}
        number=number.replace(/\..*|[^0-9]/g,'').split('');
        format=format.replace(/\..*/g,'').split('');
        for(var i=format.length-1;i>-1;i--){
            if(format[i]=='#'){format[i]=number.pop()}
        }
        var a = number.join('')+format.join('')+tail;
        if(n < 1000) a = "0" + a;
        return a;
    }

    var id = $stateParams.id;
    var a = ConvertNumber(id,"###\\###");



    fs.readdir(process.cwd() + "\\vendor\\img\\dossiers\\" + a  , callback);

    function callback(err,files){
        console.log(err,files);
        $scope.path = process.cwd() + "\\vendor\\img\\dossiers\\" + a + "\\";
        $scope.imgs = files;
    }
}
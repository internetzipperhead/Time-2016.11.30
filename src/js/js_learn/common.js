/**
 *  ���õ�һЩjs С���ܺ���
 * Created by lixing1 on 2016/12/29.
 */

    /*
        ����ж��Ǹ�����ʱһ������
     */
    var arr = [12];
    typeof arr ; // Object

    //����object������ constructor
    arr.constructor.name ; // Array

    //�ж��Ƿ��������һ��ʵ��
    arr instanceof Array;

    // ���ö���objectԭ�����ϵ� toString ����
    console.log(   Object.prototype.toString.call(arr) === "[Object Array]");
//�Ƽ�����3

/**
 * �����Ҷ�����һ������var arr = [0,1,2,3,4,5];��������ģ��push��������������5����Ӷ���������Ӧ����ô����
 */
var arr2 = [0,1,2,3,4,5];
function Push(){
    for(var i;i<arguments.length;i++){
        arr[arr.length] = arguments[i];
    }
}

Array.prototype.Push = function(){
    for(var i;i<arguments.length;i++){
        this[this.length] = arguments[i];
    }
};
//�������arr�޸ĳ�this��this��ʾ˭���þ���˭


//3����������֣���������ӵ������У����������������������ô��������ӵ�һ��
function strToArr(str){
    var num = '';
    var result = [];
    for(var i=0;i<str.length;i++){
        if(!isNaN(+str[i])){
            num += str[i];
            if(isNaN(+str[i+1])){
                result.push(num);
                num = '';
            }
        }
    }
    return result;
}

//���ַ�����ǧ�ַ���ÿ��λ��һ����
function addThousands(str){
    var first = str.length%3;
    var result = [];
    var hash = str.substring(first);
    if(first !==0){
        result.push(str.substring(0,first))
    }
    var s = '';
    for(var i=0;i<hash.length;i++){
        s += hash[i];
        if(i%3 === 2){
            result.push(s);
            s = '';
        }
    }
    console.log(result.join(","));
}

/*
 �ַ����м䲿�ֱ��*��ָ���ķ��ţ�Ĭ�ϱ���ǰ3λ�ͺ�3λ���ַ����Ȳ���ʱ���ȱ���������ַ�
 */
function encodePhone(str,startNum,endNum,mask){

}
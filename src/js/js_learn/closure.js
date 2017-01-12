/**
 * һ����� this �� �հ� ��ѧϰ
 * Created by lixing1 on 2016/12/29.
 */

    //����û��ʵ��i�����ݰ�
var arr = [];
for(var i=0;i<2;i++){
    arr[i] = function(){
        console.log(i);
    }
}
arr[0](); //2
arr[1](); //2


//������һ
//������ѭ������ִ���ˣ��ǿ��Դ�ӡ��0,1��������û��ʵ�ְ����ӡ������
var arr = [];
for(var i=0;i<2;i++){
    arr[i] = function(){
        console.log(i);
    }
    arr[i]();
}


//��������ʹ�ñհ�. �ɹ�������i.����arr�����i�õ��Ǳհ������i��������for�����i��ͬʱÿ���հ��Ļ������Ƕ�����
var arr = [];
for(var i=0;i<2;i++){
    arr[i] = (function(){
        return function(){
            console.log(i);
        }
    })(i);
}
arr[0](); //0
arr[1](); //1

//����д��
var arr = [];
for(var i=0;i<2;i++){
    (function(i){
        arr[i] = function(){
            console.log(i);
        }
    })(i);
}
arr[0](); //0
arr[1](); //1



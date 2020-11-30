var express = require ('express');
var router = express.Router();
const tencentcloud = require("tencentcloud-sdk-nodejs");




// 导入对应产品模块的client models。
const smsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;


/* 必要步骤：
 * 实例化一个认证对象，入参需要传入腾讯云账户密钥对secretId，secretKey。
 * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
 * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
 * 以免泄露密钥对危及你的财产安全。
 * CAM密匙查询: https://console.cloud.tencent.com/cam/capi*/
//let cred = new Credential(process.env.TENCENTCLOUD_SECRET_ID, process.env.TENCENTCLOUD_SECRET_KEY);
let cred = new Credential("AKIDLc4QdiFQ4XrrjTET9jFeDfzADg4KCXWL", "zq7HcpFYovneHgqZ4KK8uWu26wZz9F8i");
/* 非必要步骤:
 * 实例化一个客户端配置对象，可以指定超时时间等配置 */
let httpProfile = new HttpProfile();
/* SDK默认使用POST方法。
 * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
httpProfile.reqMethod = "POST";
/* SDK有默认的超时时间，非必要请不要进行调整
 * 如有需要请在代码中查阅以获取最新的默认值 */
httpProfile.reqTimeout = 30;
httpProfile.endpoint = "sms.tencentcloudapi.com";

// 实例化一个client选项，可选的，没有特殊需求可以跳过。
let clientProfile = new ClientProfile();
/* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
clientProfile.signMethod = "HmacSHA256";
clientProfile.httpProfile = httpProfile;

/* SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
 * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com
 * 实例化要请求产品(以sms为例)的client对象
 * 第二个参数是地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
let client = new smsClient(cred, "ap-guangzhou", clientProfile);

/* 实例化一个请求对象，根据调用的接口和实际情况，可以进一步设置请求参数
 * 你可以直接查询SDK源码确定SendSmsRequest有哪些属性可以设置
 * 属性可能是基本类型，也可能引用了另一个数据结构
 * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */
let req = new models.SendSmsRequest();

/* 基本类型的设置:
 * SDK采用的是指针风格指定参数，即使对于基本类型你也需要用指针来对参数赋值。
 * SDK提供对基本类型的指针引用封装函数
 * 帮助链接：
 * 短信控制台: https://console.cloud.tencent.com/sms/smslist
 * sms helper: https://cloud.tencent.com/document/product/382/3773 */

/* 短信应用ID: 短信SdkAppid在 [短信控制台] 添加应用后生成的实际SdkAppid，示例如1400006666 */
/* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
/* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
/* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
/* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
/* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
 * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
/* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
/* 模板参数: 若无模板参数，则设置为空*/
// 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
req.SmsSdkAppid = "1400357952";
req.Sign = "fatan网";
req.ExtendCode = "";
req.SenderId = "";
req.SessionContext = "";//提供用户差异信息  
req.PhoneNumberSet = [""];//电话,需要导入
req.TemplateID = "538263";
req.TemplateParamSet = [""];//模板变量,需要导入
function sending(phone,template){
    if(req.PhoneNumberSet[0].lenght  && req.TemplateParamSet[0].lenght ){
        req.PhoneNumberSet = phone;
        req.TemplateParamSet = template;
        client.SendSms(req, function (err, response) {
            // 请求异常返回，打印异常信息
            if (err) {
                console.log(err);
                return;
            }
            // 请求正常返回，打印response对象
            console.log(response.to_json_string());
        });
    }

}


router.post("/ssms",(req,res)=>{
    let msginfo = req.body;
    let phoneNO = [];
    phoneNO.push(msginfo.Phone);
    let keyNO = [];
    keyNO.push(msginfo.Key);
    keyNO.push("2")
    sending(phoneNO,keyNO);
    res.send({msg:"发送成功",result:True})
})

module.exports = router;

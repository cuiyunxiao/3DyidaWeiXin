var util = require("../../../utils/util.js");
const geturl = require('../../../config.js').geturl;
const showAddress = require('../../../config.js').showAddress;
const editAddress = require('../../../config.js').editAddress;
const saveAddress = require('../../../config.js').saveAddress;
const addressMr = require('../../../config.js').addressMr;
var tcity = require("../../../utils/citys.js");
var app = getApp();
Page({
  data: {
    init_email: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    id:'',
    isdefault:'n',
    items: [
      { name: 'isdefault', value: '设置为默认' },
    ]
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (options) {
    var that = this;
    var list = JSON.parse(options.details)
    console.log(list.tel)
    // 设置初始地址数据
    that.setData({
      init_name: list.name,
      name: list.name,
      init_phone: list.tel,
      phone: list.tel,
      init_email: list.email,
      email: list.email,
      init_address: list.addressMx,
      address: list.addressMx,
      province: list.province,
      city: list.city,
      county: list.area,
      provinces: [list.province],
      citys: [list.city],
      countys: [list.area],
      id: [list.id]
    })
    //设置城市选择
    console.log(that.data.provinces);


    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': list.province,
      'city': list.city,
      'county': list.area
    })
    console.log('初始化完成');
    var value = '';
    try {
      value = wx.getStorageSync('order_data');
    } catch (e) {
      // Do something when catch error
    }
    console.log(value)
    var name = '';
    if (value.name != 'undefined') {
      name = value.name;
    }
    var phone = '';
    if (value.phone != 'undefined') {
      phone = value.phone;
    }
    var address = '';
    if (value.address != 'undefined') {
      address = value.address;
    }
    var province = '';
    if (value.province != 'undefined') {
      province = value.province;
    }
    var city = '';
    if (value.city != 'undefined') {
      city = value.city;
    }
    var district = '';
    if (value.district != 'undefined') {
      district = value.district;
    }
    var id = '';
    if (value.id != 'undefined') {
      id = value.id;
    }
    console.log(name)
    // that.setData({
    //   init_name: name,
    //   name: name,
    //   init_phone: phone,
    //   phone: phone,
    //   init_email: email,
    //   email: email,
    //   init_address: address,
    //   address: address,
    //   province: province,
    //   city: city,
    //   county: district,

    // })

  },
  // 设置默认地址
  radioChange: function (e) {
    var that = this
    var id = that.data.id
    that.setData({
      isdefault:'y'
    })
  },
  //姓名手机号详细地址输入
  input: function (event) {
    var val = event.target.dataset.type;
    console.log(event)
    if (val == "name") {
      this.setData({
        name: event.detail.value
      })
    } else if (val == "tel") {
      this.setData({
        phone: event.detail.value
      })
    } else if (val == "address") {
      this.setData({
        address: event.detail.value
      })
    } else if (val == "email") {
      this.setData({
        email: event.detail.value
      })
    }
    console.log(event.detail.value)
  },
  // 按钮样式
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "保存中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "保存",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9800",
      btnLoading: !this.data.btnLoading
    });
  },

  //保存
  confirm: function () {
   
    var that = this;
    var data = that.data;
    console.log(that.data.phone)
    console.log(that.data.name)
    console.log(that.data.email)
    if (!data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: '11',
        duration: 2000
      });
      return false;
    }
    if (!data.email) {
      wx.showToast({
        title: '请输入邮箱',
        icon: '11',
        duration: 2000
      });
      return false;
    }
    // if (data.tel.length == 0) {
    //   wx.showToast({
    //     title: '请输入手机号',
    //     duration: 2000
    //   });
    //   return false;
    // }

    if (!data.address) {
      wx.showToast({
        title: '请输入详情地址',
        duration: 2000
      });
      return false;
    }
    wx.showToast({
      title: '保存中...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: geturl(saveAddress),
      data: {
        name: data.name,
        email: data.email,
        tel: data.phone,
        province: data.province,
        addressMx: data.address,
        city: data.city,
        area: data.county,
        id: data.id,
        isdefault: data.isdefault
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 200) {
          setTimeout(function () {
            wx.showToast({
              title: "保存成功",
              icon: 'success',
              duration: 2000
            })
          }, 2000)
          //返回页面
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 3000)

        } else {
          setTimeout(function () {
            wx.showToast({
              title: "res.data.error_msg",
              icon: 'success',
              duration: 2000
            })
          }, 2000)
        }
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.hideToast()
      }
    })
  }
})

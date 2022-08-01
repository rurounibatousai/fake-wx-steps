import React, { useState, useRef, useImperativeHandle } from "react"
import image2Base64 from './utils/image2Base64.js'
import html2canvas from 'html2canvas';

const NavBar = () => {
  return (
    <div className="flex w-full justify-between items-center h-11 px-3">
      <i className="iconfont icon-back text-xs"></i>
      <span className="text-base font-bold">我的主页</span>
      <i className="iconfont icon-more text-xs"></i>
    </div>
  )
}

const UserProfile = (props) => {

  const notyShowSettingModal = () => {
    props.click()
  }

  return (
    <div className="h-96 relative" onClick={() => notyShowSettingModal()}>
      <div className="overflow-hidden h-96 w-full">
        <img src={props.backgroundImage} className="w-full" alt="" />
      </div>
      <div className="bg-white p-1 rounded-lg absolute -bottom-7 left-5 w-16 h-16 overflow-hiddenqws">
        <div className="w-14 h-14 rounded-lg absolute left-0 right-0 top-0 bottom-0 m-auto overflow-hidden">
          <img src={props.avatar} alt="" className="" />
        </div>
      </div>
      <span className="text-lg text-white absolute font-semibold left-24 bottom-0">{props.userNickName}</span>
    </div>
  )
};

const TodaySteps = (props) => (
  <div className="mx-5">
    <div className="flex justify-between items-center h-8 mt-9">
      <span className="text-base font-bold ml-2">今日运动</span>
      <span className="text-sm flex items-center" style={{ color: "#717171" }}>
        {props.date}
        <i className="iconfont icon-forward"></i>
      </span>
    </div>
    <div className="bg-white px-4 text-xs rounded-md flex items-center justify-between mt-3 py-5">
      <span className="font-bold" style={{ color: '#737373' }}>
        步数
        <span className="px-3 text-2xl font-semibold" style={{ color: props.steps < 10000 ? "#00b24f" : "#f49727" }}>{props.steps}</span>
        步
      </span>
      <span className="flex items-center" style={{ color: '#737373' }}>
        {props.rateCount}
        <i className="iconfont icon-collect ml-1" style={{ color: "#dedede" }}></i>
      </span>
    </div>
  </div>
)

const Collects = (props) => {
  const handleCapture = () => {
    props.click()
  }
  return (
    <div className="mx-5 mt-4">
      <div className=" bg-white py-4 px-4 text-base font-bold rounded-md flex items-center justify-between rounded-bl-none rounded-br-none">
        <span>
          我关注的人
        </span>
        <i className="iconfont icon-forward" style={{ color: '#6f6f6f' }}></i>
      </div>
      <div className="bg-white mt-px py-4 px-4 text-base font-bold rounded-md flex items-center justify-between rounded-tl-none rounded-tr-none" onClick={() => handleCapture()}>
        <span>
          捐赠步数
        </span>
        <i className="iconfont icon-forward" style={{ color: '#6f6f6f' }}></i>
      </div>
    </div>
  )
}

const SettingModal = React.forwardRef((props, ref) => {
  const [display, setDisplay] = useState('none')
  const changeDisplay = (data) => {
    setDisplay(data)
  }

  useImperativeHandle(ref, () => ({
    changeDisplay
  }));

  const handleSelectBackground = (e) => {
    image2Base64(e.target.files[0], (res) => {
      props.backgroundChange(res);
      localStorage.setItem('bg', res);
    })
  };

  const handleSelectAvatar = (e) => {
    image2Base64(e.target.files[0], (res) => {
      props.avatarChange(res);
      localStorage.setItem('avatar', res);
    })
  };

  const handleStepsChange = (e) => {
    props.stepsChange(e.target.value)
  }

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    props.dateChange(`${month}月${day}日`)
  }

  const handleRateCountChange = (e) => {
    props.rateChange(e.target.value)
  }

  const handleUserNickNameChange = (e) => {
    props.userNickNameChange(e.target.value)
  }

  return (
    <div className="fixed z-10 top-0 left-0 right-0 bottom-0 mx-auto bg-black bg-opacity-70" style={{ display }} ref={ref}>
      <div className="z-20 w-11/12 bg-white h-60 absolute top-0 left-0 right-0 bottom-0 m-auto rounded-lg p-4">
        <div className="flex items-center h-8">
          <span className="text-sm flex-shrink-0">设置背景</span>
          <input className="pl-4 absolute left-20 opacity-0" type="file" accept="image/*" onChange={handleSelectBackground} />
          <span className="ml-5 text-sm">选择图片</span>
        </div>
        <div className="flex items-center h-8">
          <span className="text-sm flex-shrink-0">设置头像</span>
          <input className="pl-4 absolute left-20 opacity-0" type="file" accept="image/*" onChange={handleSelectAvatar} />
          <span className="ml-5 text-sm">选择图片</span>
        </div>
        <div className="flex items-center h-8">
          <span className="text-sm">设置昵称</span>
          <input className="ml-4 outline-none border-b text-sm" type="text" placeholder="请输入昵称" onChange={(e) => handleUserNickNameChange(e)} />
        </div>
        <div className="flex items-center h-8">
          <span className="text-sm">设置日期</span>
          <input className="ml-4 outline-none border-b text-sm" type="datetime-local" placeholder="请输入日期" onChange={(e) => handleDateChange(e)} />
        </div>
        <div className="flex items-center h-8">
          <span className="text-sm">设置步数</span>
          <input className="ml-4 outline-none border-b text-sm" type="text" placeholder="请输入步数" onChange={(e) => handleStepsChange(e)} />
        </div>
        <div className="flex items-center h-8">
          <span className="text-sm">设置点赞</span>
          <input className="ml-4 outline-none border-b text-sm" type="text" placeholder="请输入点赞数" onChange={(e) => handleRateCountChange(e)} />
        </div>
        <div className="absolute bottom-2 right-2 text-white p-1 bg-blue-500 rounded-lg" onClick={(e) => { e.stopPropagation(); setDisplay('none') }}>
          Done
        </div>
      </div>
    </div >
  )
})

const App = () => {
  const currentDate = new Date();
  const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem('bg') || '');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
  const [userNickName, setUserNickName] = useState('Example');
  const [steps, setSteps] = useState(12345);
  const [date, setDate] = useState(`${currentDate.getMonth() + 1}月${currentDate.getDate()}日`);
  const [rateCount, setRateCount] = useState(0);
  const settingModalRef = useRef(null);

  const handleShowSettingModal = () => {
    settingModalRef.current.changeDisplay('block')
  }

  const capture = () => {
    html2canvas(document.body, {
      logging: false, //日志开关，便于查看html2canvas的内部执行流程
      width: document.body.clientWidth, //dom 原始宽度
      height: document.body.clientHeight,
      scrollY: 0,
      scrollX: 0,
      backgroundColor: '#ededed',
      useCORS: true // 【重要】开启跨域配置
    }).then(function (canvas) {
      let src = canvas.toDataURL('image/png', 1)
      let image = new Image()
      image.src = src
      let url = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream')//输出类型
      let a = document.createElement('a');//随便创建一个元素
      a.download = `${date}运动截图.png`// 设置下载的文件名，默认是'下载'
      a.href = url
      document.body.appendChild(a)
      a.click()
      a.remove() // 下载之后把创建的元素删除
    });
  }

  return (
    <div className="h-screen relative" style={{ background: '#ededed' }}>
      <NavBar />
      <UserProfile
        backgroundImage={backgroundImage}
        avatar={avatar}
        userNickName={userNickName}
        click={handleShowSettingModal}
      />
      <TodaySteps
        steps={steps}
        date={date}
        rateCount={rateCount}
      />
      <Collects
        click={capture}
      />
      <SettingModal
        ref={settingModalRef}
        backgroundChange={setBackgroundImage}
        avatarChange={setAvatar}
        userNickNameChange={setUserNickName}
        stepsChange={setSteps}
        dateChange={setDate}
        rateChange={setRateCount}
      />
    </div>
  )
}

export default App;
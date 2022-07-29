import React, { useState, useRef, useImperativeHandle } from "react"
import image2Base64 from './utils/image2Base64.js'
const NavBar = () => {
  return (
    <div className="flex w-full justify-between items-center h-10 px-3">
      <i className="iconfont icon-back text-xs"></i>
      <span className="text-sm font-semibold">我的主页</span>
      <i className="iconfont icon-more text-xs"></i>
    </div>
  )
}

const UserProfile = (props) => (
  <div className="h-80 relative" style={{ background: `white url(${props.backgroundImage}) center/100vw no-repeat` }}>
    <div className="bg-white p-1 rounded-md absolute -bottom-7 left-3 w-16 h-16">
      <div className="rounded-md w-14 h-14" style={{ background: `green url(${props.avatar}) center/3.5rem no-repeat` }} />
    </div>
    <span className="text-xs text-white absolute bottom-1 left-20">{props.userNickName}</span>
  </div>
)

const TodaySteps = (props) => (
  <div className="mt-14 mx-5">
    <div className="flex justify-between">
      <span className="text-xs font-semibold">今日运动</span>
      <span className="text-xs flex items-center" style={{ color: "#717171" }}>
        {props.date}
        <i className="iconfont icon-forward"></i>
      </span>
    </div>
    <div className="mt-4 bg-white py-8 px-4 text-xs rounded-md flex items-center justify-between no-leading">
      <span className="scale-90 no-leading">
        步数
        <span className="px-3 text-2xl font-semibold no-leading" style={{ color: props.steps < 10000 ? "#00b24f" : "#f49727" }}>{props.steps}</span>
        步
      </span>
      <span className="flex items-center">
        {props.rateCount}
        <i className="iconfont icon-collect ml-1" style={{ color: "#dedede" }}></i>
      </span>
    </div>
  </div>
)

const Collects = () => (
  <div className="mx-5">
    <div className="mt-4 py-4 bg-white px-4 text-xs rounded-md flex items-center justify-between rounded-bl-none rounded-br-none">
      <span>
        我关注的人
      </span>
      <i className="iconfont icon-forward"></i>
    </div>
    <div className="bg-white mt-px py-4 px-4 text-xs rounded-md flex items-center justify-between rounded-tl-none rounded-tr-none">
      <span>
        捐赠步数
      </span>
      <i className="iconfont icon-forward"></i>
    </div>
  </div>
)

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
    })
  };

  const handleSelectAvatar = (e) => {
    image2Base64(e.target.files[0], (res) => {
      props.avatarChange(res);
    })
  };

  const handleStepsChange = (e) => {
    props.stepsChange(e.target.value)
  }

  const handleDateChange = (e) => {
    props.dateChange(e.target.value)
  }

  const handleRateCountChange = (e) => {
    props.rateChange(e.target.value)
  }
  
  const handleUserNickNameChange = (e) => {
    props.userNickNameChange(e.target.value)
  }

  return (
    <div className="fixed z-10 top-0 left-0 right-0 bottom-0 mx-auto bg-black bg-opacity-70" style={{ display }} ref={ref}>
      <div className="z-20 w-11/12 bg-white h-1/3 absolute top-0 left-0 right-0 bottom-0 m-auto rounded-lg p-4">
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
          <input className="ml-4 outline-none border-b text-sm" type="text" placeholder="请输入日期" onChange={(e) => handleDateChange(e)} />
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
  const [backgroundImage, setBackgroundImage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userNickName, setUserNickName] = useState('Example');
  const [steps, setSteps] = useState(12345);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [rateCount, setRateCount] = useState(0);
  const settingModalRef = useRef(null);

  return (
    <div className="h-screen relative" style={{ background: '#ededed' }} onClick={() => { settingModalRef.current.changeDisplay('block') }}>
      <NavBar />
      <UserProfile
        backgroundImage={backgroundImage}
        avatar={avatar}
        userNickName={userNickName}
      />
      <TodaySteps
        steps={steps}
        date={date}
        rateCount={rateCount}
      />
      <Collects />
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
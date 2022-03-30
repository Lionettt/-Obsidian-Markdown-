import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor"  
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css"

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'

function App() {
  const [files, setFiles] = useState(defaultFiles);//
  const [activeFileID, setActiveFileID] = useState('');//点击被激活的文件的id
  const [openedFileIDs, setOpenedFileIDs] = useState([]); //打开文件的id，打开文件
  const [unsaveFilesIDs, setUnsaveFilesIDs] = useState([]);//tab未保存的文件
  const [searchedFiles, setSearchedFiles] = useState([])
  const openTabList = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  })
  const activeTabFile = files.find(file => file.id === activeFileID);//对象，找出选中的tab
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : files;


  const listDelet = (e, defaultFiles) => {
    const filterList = files.filter(files => files.id !== defaultFiles.id)
    
    setFiles(filterList)
    tabClose(e, defaultFiles)
  }
  const upDateListName = (id, title) => {
    const newLists = files.map(file => {
      if (file.id === id) {
        file.title = title
      }
      return file;
    })
    setFiles(newLists)
  }

  const opendTab = (defaultFiles) => {
    setActiveFileID(defaultFiles.id)
    if (!openedFileIDs.includes(defaultFiles.id)) {
      setOpenedFileIDs([...openedFileIDs, defaultFiles.id])
    }
  }

  const setTabActive = (e, defaultFiles) => {
    e.preventDefault();
    setActiveFileID(defaultFiles.id)
  }

  const tabClose = (e, defaultFiles) => {
    e.stopPropagation(); //防止冒泡
    const filterTab = openedFileIDs.filter(tabID => tabID !== defaultFiles.id)
    setOpenedFileIDs(filterTab)
    if (filterTab.length > 0) {
      setActiveFileID(filterTab[filterTab.length - 1])
    } else {
      setActiveFileID('')
    }
  }
  const searchList = (keyword) => {
    const newFiles = files.filter(file => {
      return file.title.includes(keyword);
    })
    setSearchedFiles(newFiles)
    
  }

  const ediMDE = (defaultFiles) => {
    console.log(defaultFiles)
  }



  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col bg-light left-panel">
          <FileSearch
            searchList={searchList}
          />
          <FileList
            defaultFiles={fileListArr}
            activeid={activeFileID}
            opendTab={opendTab}
            listDelet={listDelet}
            upDateListName={upDateListName}
          />
          <div className="row button-group">
            <div className="col ">
              <BottomBtn />
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          {!activeTabFile &&
            <div className="start-page">
              未打开文件
            </div>
          }
          {activeTabFile &&
            <>
              <TabList
                openTabList={openTabList}
                acvtiveTabFile={activeFileID}
                unSaveTabIDs={unsaveFilesIDs}
                setTabActive={setTabActive}
                tabClose={tabClose}
              />
              <SimpleMDE
                key={activeTabFile && activeTabFile.id}
                value={activeTabFile && activeTabFile.body}
                onChange={value => { ediMDE() }}
                options={{ minHeight: '515px' }}
              />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css"
import uuidv4 from 'uuid/v4'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'
import { flattenArr, objToArr } from './utils/helper'

function App() {
  
  const [files, setFiles] = useState(flattenArr(defaultFiles));//
  const [activeFileID, setActiveFileID] = useState('');//点击被激活的文件的id
  const [openedFileIDs, setOpenedFileIDs] = useState([]); //打开文件的id，打开文件
  const [unsaveFilesIDs, setUnsaveFilesIDs] = useState([]);//tab未保存的文件
  const [searchedFiles, setSearchedFiles] = useState([])
  
  const openTabList = openedFileIDs.map(openID => {
    return files[openID];
  })
  const filesArr = objToArr(files);
  const activeTabFile = files[activeFileID];//找出选中的tab
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr;

  const listDelete = (defaultFiles) => {
    delete files[defaultFiles.id];
    setFiles(files)
    tabClose(defaultFiles)
  }
  const upDateListName = (id, title) => {
    const newListName = { ...files[id], title, isNew: false }
    setFiles({ ...files, [id]: newListName })
  }

  const opendTab = (defaultFiles) => {
    setActiveFileID(defaultFiles.id)
    if (!openedFileIDs.includes(defaultFiles.id)) {
      setOpenedFileIDs([...openedFileIDs, defaultFiles.id])
    }
  }

  const setTabActive = (defaultFiles) => {
    setActiveFileID(defaultFiles.id)
  }

  const tabClose = (defaultFiles) => {
    const filterTab = openedFileIDs.filter(tabID => tabID !== defaultFiles.id)
    setOpenedFileIDs(filterTab)

    //TAB存在的情况
    if (filterTab.length > 0) {
      setActiveFileID(filterTab[filterTab.length - 1])
    } else {
      setActiveFileID('')
    }
  }

  const searchList = (value) => {
    const newlistFiles = filesArr.filter(file => {
      return file.title.includes(value);
    })
    setSearchedFiles(newlistFiles)

  }


  const createFile = () => {
    const newID = uuidv4();
    const newFile = {
      id: newID,
      title: '',
      body: '请输入 markdown',
      createdAt: new Date().getTime(),
      isNew: true,
    }
    setFiles({...files, [newID]: newFile});
  }
 
  const ediMDE = (id, value) => {
    const newFile = { ...files[id], body: value }
    setFiles({ ...files, [id]: newFile })

    if (!unsaveFilesIDs.includes(id)) {
      setUnsaveFilesIDs([...unsaveFilesIDs, id])
    }
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
            listDelete={listDelete}
            upDateListName={upDateListName}
          />
          <div className="row button-group">
            <div className="col ">
              <BottomBtn
                createFile={createFile}
              />
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
                onChange={value => { ediMDE(activeFileID, value) }}
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
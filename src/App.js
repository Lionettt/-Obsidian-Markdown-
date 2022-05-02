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
import { flattenArr, objToArr } from './utils/helper'
import fileHelper from './utils/fileHelper'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//node和electron
const { join } = window.require('path');
const { remote } = window.require('electron')
const Store = window.require('electron-store')
const fileStore = new Store({ name: '222222' })
//保存到store的逻辑
const saveFilesToStore = (files) => {
  const filesStoreObj = objToArr(files).reduce((result, files) => {
    const { id, path, title, createdAt } = files

    result[id] = {
      id,
      path,
      title,
      createdAt
    }
    return result
  }, {})
  fileStore.set('files', filesStoreObj);
}

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {});//从electron-store中取出files
  const [activeFileID, setActiveFileID] = useState('');//点击被激活的tab，MDE的id，
  const [openedFileIDs, setOpenedFileIDs] = useState([]); //打开tab的id，打开文件
  const [unsaveFilesIDs, setUnsaveFilesIDs] = useState([]);//tab未保存的文件
  const [searchedFiles, setSearchedFiles] = useState([])//搜索的文件
 
  const filesArr = objToArr(files);//转数组
  const openTabList = openedFileIDs.map(openID => {
    return files[openID];
  })
  const SearchListFiles = (searchedFiles.length > 0) ? searchedFiles : filesArr; //搜索时候的数据
  const activeFile = files[activeFileID];//选中的文件
  const savedLocation = remote.app.getPath('documents') //获取documents路径

  const listDelete = (defaultFiles) => {
    const id = defaultFiles.id
    if (files[id].isNew) {
      const { [id]: value, ...afterDelete } = files;
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path)
        .then(() => {
          const { [id]: value, ...afterDelete } = files;
          setFiles(afterDelete)
          saveFilesToStore(afterDelete)
          tabClose(defaultFiles)
        })
    }
  }
  const upDateListName = (id, title, isNew) => {
    const newPath = join(savedLocation, `${title}.md`)
    const newListName = { ...files[id], title, isNew: false, path: newPath }
    const newFiles = { ...files, [id]: newListName }
    if (isNew) {
      fileHelper.writeFile(newPath, files[id].body)
        .then(() => { //?
          setFiles(newFiles)
          saveFilesToStore(newFiles)
        })
    }
    else {
      const oldPath = join(savedLocation, `${files[id].title}.md`)
      fileHelper.renameFile(oldPath, newPath)
        .then(() => {
          setFiles(newFiles)
          saveFilesToStore(newFiles)
        })
    }
  }
  const createFile = () => {
    const newID = Math.random();
    const newFile = {
      id: newID,
      title: '',
      body: '请输入 markdown',
      createdAt: new Date().getTime(),
      isNew: true,
    }
    setFiles({ ...files, [newID]: newFile });
  }

  //Tab
  const opendTab = (defaultFiles) => {
    setActiveFileID(defaultFiles.id)
    const currentList = files[defaultFiles.id]
    if (!currentList.isLoaded) {
      fileHelper.readFile(currentList.path).then(value => {
        const newFile = { ...files[defaultFiles.id], body: value, isLoaded: true }
        setFiles({ ...files, [defaultFiles.id]: newFile })
      })
    }
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
  //搜索
  const searchList = (value) => {
    const filterList = SearchListFiles.filter(files => {
      return files.title.includes(value);
    })
    setSearchedFiles(filterList)
  }
//markdown
  const ediMDE = (id, value) => {
    const newFile = { ...files[id], body: value }
    setFiles({ ...files, [id]: newFile })
    if (!unsaveFilesIDs.includes(id)) {
      setUnsaveFilesIDs([...unsaveFilesIDs, id])
    }
  }
  const saveCurrentFile = () => {
    fileHelper.writeFile(join(savedLocation, `${activeFile.title}.md`), activeFile.body)
      .then(() => {
        unsaveFilesIDs(unsaveFilesIDs.filter(id => id !== activeFile.id))
      })
  }
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col bg-light left-panel">
          <FileSearch
            searchList={searchList}
            files={files}
          />
          <FileList
            defaultFiles={SearchListFiles}
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
          {!activeFile &&
            <div className="start-page">
              未打开文件
            </div>
          }
          {activeFile &&
            <>
              <TabList
                openTabList={openTabList}
                acvtiveTabFile={activeFileID}
                unSaveTabIDs={unsaveFilesIDs}
                setTabActive={setTabActive}
                tabClose={tabClose}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={value => { ediMDE(activeFileID, value) }}
                options={{ minHeight: '515px' }}
              />
              <div className="col">
                <button
                  type="button"
                  className={`col btn btn-block no-border btn-success`}
                  onClick={() => { saveCurrentFile() }}
                >
                  <FontAwesomeIcon
                    className="mr-2"
                    size="lg"
                    icon={faSave}
                  />
                  保存
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'

export const tools={
  embed:Embed,
  list:{
    class:List,
    inlineToolbar:true
  },
  image:Image,
  header:{
    class:Header,
    config:{
      placeholder:"type heading...",
      levels:[2,3],
      defaultLevel:2
    }
  },
  quote:{
    class:Quote,
    inlineToolbar:true
  },
  marker: Marker,
  inlineCode:InlineCode,
}
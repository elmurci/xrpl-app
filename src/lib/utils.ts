import axios from "axios";
import { Buffer } from 'buffer';

export const fetchPlugin = async (pluginFile: string, language: string) => {
    try {
  
      const res = await axios({
        url: `https://api.github.com/repos/mvadari/xrpl-plugin/contents/python/examples/${pluginFile}`, //TODO: Language
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return {
        name: pluginFile,
        language,
        content: Buffer.from(res.data.content, 'base64').toString()
      }
    } catch (err) {
      console.error(err)
    }
  }
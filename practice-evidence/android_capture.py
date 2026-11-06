import subprocess, time, pathlib, xml.etree.ElementTree as ET, re
out=pathlib.Path('evidence');out.mkdir(exist_ok=True)
def run(*args):
    return subprocess.run(args,check=True,capture_output=True,text=True).stdout
run('adb','install','-r','app/build/outputs/apk/debug/app-debug.apk')
run('adb','shell','am','start','-n','cc.pyanexy.studycounter/.MainActivity')
time.sleep(3)
def capture(name):
    run('adb','shell','screencap','-p','/sdcard/'+name+'.png')
    run('adb','pull','/sdcard/'+name+'.png',str(out/(name+'.png')))
def dump():
    run('adb','shell','uiautomator','dump','/sdcard/ui.xml')
    run('adb','pull','/sdcard/ui.xml',str(out/'ui.xml'))
    return ET.parse(out/'ui.xml').getroot()
def tap(label):
    root=dump()
    node=next(n for n in root.iter('node') if n.get('text','').casefold()==label.casefold())
    x1,y1,x2,y2=map(int,re.findall(r'\d+',node.get('bounds')))
    run('adb','shell','input','tap',str((x1+x2)//2),str((y1+y2)//2))
    time.sleep(.4)
capture('01-start')
for _ in range(3):tap('Добавить 1')
assert any(n.get('text')=='3' for n in dump().iter('node'))
capture('02-three-taps')
tap('Сбросить')
assert any(n.get('text')=='0' for n in dump().iter('node'))
capture('03-reset')
print('PASS: app launched, 3 button taps show 3, reset shows 0')

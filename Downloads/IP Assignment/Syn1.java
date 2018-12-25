

import java.util.concurrent.Semaphore;

public class Syn1 extends Thread{

	static Semaphore semaphore = new Semaphore(2);
	String name = "";

	Syn1(String name) {
		this.name = name;
	}

	static String var1 = "Hello World\n";
	static String var2 = "BOUNS World\n";
	public static void main(String[] args) {
		Syn1 t1 = new Syn1(var1);
		Syn1 t2 = new Syn1(var2);
	      t1.start();
	      t2.start();
	}

	public static void myDisplay(String msg) {

		for (int i=0;i<10;i++){
			Display.Display(msg);
		}
	}
	public void run() {
		try {
				semaphore.acquire();
				myDisplay(name);
				semaphore.release();

				Thread.sleep(4000);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
